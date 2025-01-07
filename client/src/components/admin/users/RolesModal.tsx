import React, { useEffect, useState } from "react";
import useFetch from "../../../hooks/useFetch";
import { AllRolesResponseDto, UserRoles } from "../../../types/roles.types";
import { toast } from "react-toastify";
import { axiosPrivate } from "../../../api/api";
import { API_URLS } from "../../../api/api-urls";
import useCustomNavigate from "../../../hooks/useCustomNavigate";
import Spinner from "../../common/Spinner";
import Error from "../../Error";

type RolesModalProps = {
  isOpen: boolean;
  onClose: () => void;
  action: "Assign" | "Remove" | "Remove All";
  userId: string;
};

const RolesModal: React.FC<RolesModalProps> = ({
  isOpen,
  onClose,
  action,
  userId,
}) => {
  const {
    data: rolesResponse,
    error: errorRoles,
    isLoading: isLoadingRoles,
  } = useFetch<AllRolesResponseDto>(API_URLS.getAllRoles);

  const customNavigate = useCustomNavigate();

  const [selectedRoles, setSelectedRoles] = useState<UserRoles[]>([]);
  const [updatingRoles, setIsUpdatingRoles] = useState<boolean>(false);

  useEffect(() => {
    if (!isOpen) {
      setSelectedRoles([]);
    }
  }, [isOpen]);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as UserRoles;
    if (value && !selectedRoles.includes(value)) {
      setSelectedRoles((prev) => [...prev, value]);
    }
  };

  const handleRoleRemove = (role: string) => {
    setSelectedRoles((prev) => prev.filter((r) => r !== role));
  };

  const handleSubmitRolesModal = async () => {
    if (selectedRoles.length === 0 && action !== "Remove All") {
      toast.error("Please select role/s");
      return;
    } else {
      try {
        setIsUpdatingRoles(true);
        switch (action) {
          case "Assign":
            await axiosPrivate.put(`${API_URLS.assignRoles}${userId}`, {
              roles: selectedRoles,
            });
            toast.success("Roles assigned successfully.");
            break;

          case "Remove":
            await axiosPrivate.put(`${API_URLS.removeRoles}${userId}`, {
              roles: selectedRoles,
            });
            toast.success("Roles removed successfully.");
            break;

          case "Remove All":
            await axiosPrivate.put(`${API_URLS.removeAllRoles}${userId}`);
            toast.success("All roles removed successfully.");

            break;

          default:
            break;
        }
      } catch (error) {
        console.error(error);

        const errorMessage =
          (error as any)?.response?.data?.message ||
          "An unexpected error occurred.";
        toast.error(errorMessage);
      } finally {
        onClose();
        setIsUpdatingRoles(false);
        customNavigate("/admin/users");
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-gray-800 rounded-lg shadow-lg p-6 max-w-md w-full">
        <h3 className="text-lg font-semibold mb-4 text-white">{`${action} Roles`}</h3>

        {isLoadingRoles ? (
          <div className="flex flex-col items-center justify-center">
            <Spinner />
            <p className="text-white mt-4">Loading roles...</p>
          </div>
        ) : errorRoles ? (
          <div className="text-center mt-8">
            <Error
              error={
                errorRoles?.response?.data?.error
                  ? errorRoles?.response?.data?.error
                  : errorRoles?.response?.data?.message
              }
            />
          </div>
        ) : (
          <>
            {action !== "Remove All" && (
              <>
                <select
                  className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-lg mb-4"
                  onChange={handleSelectChange}
                >
                  <option value="">Select a role</option>
                  {rolesResponse?.roles.map((role) => (
                    <option key={role.name} value={role.name}>
                      {role.name}
                    </option>
                  ))}
                </select>
                <div className="space-y-2">
                  {selectedRoles.map((role) => (
                    <div
                      key={role}
                      className="flex justify-between items-center  p-2 rounded bg-[#0d0c22]"
                    >
                      <span>{role}</span>
                      <button
                        className="text-red-500"
                        onClick={() => handleRoleRemove(role)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}
            {action === "Remove All" && (
              <p className="text-white">
                Are you sure you want to remove all roles from this user?
              </p>
            )}
          </>
        )}

        <div className="flex justify-between gap-2 mt-4">
          <button
            className="px-4 py-2 bg-red-600 rounded hover:bg-red-700"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmitRolesModal}
            className={`px-6 py-2 font-semibold rounded-lg ${
              updatingRoles
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
            disabled={updatingRoles}
          >
            {updatingRoles ? "Updating roles..." : `${action} Roles`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RolesModal;
