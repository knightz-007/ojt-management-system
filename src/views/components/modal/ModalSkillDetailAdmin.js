import React, { useEffect, useState } from "react";
import { Label } from "views/components/label";
import { useForm } from "react-hook-form";
import FormGroup from "views/components/common/FormGroup";
import useAxiosPrivate from "logic/hooks/useAxiosPrivate";
import { skillPath } from "logic/api/apiUrl";
import {
  Box,
  Button,
  Modal,
  Skeleton,
  TextField,
  useTheme,
} from "@mui/material";

const ModalSkillDetailAdmin = ({
  isOpen,
  onRequestClose,
  skillIdClicked,
  handleUpdateSkill,
  isSubmitLoading,
  error,
}) => {
  const axiosPrivate = useAxiosPrivate();
  const [skill, setSkill] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState("");

  const fetchSkill = async () => {
    try {
      setIsLoading(true);
      const response = await axiosPrivate.get(
        skillPath.GET_SKILL + skillIdClicked
      );
      setSkill(response.data);
      setIsLoading(false);
      console.log(skill);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (skillIdClicked !== 0) {
      fetchSkill();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skillIdClicked]);

  useEffect(() => {
    if (skillIdClicked) {
      setName(skill.name);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skill]);

  const { handleSubmit } = useForm();

  const handleEditSkill = async () => {
    await handleUpdateSkill({
      id: skillIdClicked,
      status: skill.status,
      name: name,
    });
  };

  const theme = useTheme();

  return (
    <Modal open={isOpen} onClose={onRequestClose}>
      <Box
        sx={{
          borderRadius: "0.5rem",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <button
          className="absolute z-10 flex items-center justify-center cursor-pointer w-11 h-11 right-1 top-1 text-text1"
          onClick={onRequestClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <h2 className="font-bold text-[25px] mb-5 text-center">
          Chỉnh sửa kỹ năng
        </h2>
        <div>
          <div className="bg-white shadow-1 rounded-xl p-4">
            <form onSubmit={handleSubmit(handleEditSkill)}>
              <FormGroup>
                <Label className="font-semibold">Tên kĩ năng (*)</Label>
                {isLoading ? (
                  <Skeleton height={60} />
                ) : (
                  <TextField
                    value={skill.name}
                    error={error?.name ? true : false}
                    helperText={error?.name}
                    name="name"
                    defaultValue={name}
                    placeholder="Ex: ReactJS"
                    onChange={(e) => setName(e.target.value)}
                    onBlur={(e) => setName(e.target.value)}
                    inputProps={{ maxLength: 100 }}
                  />
                )}
              </FormGroup>

              <div className="mt-5 flex justify-center">
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: theme.palette.success.dark,
                    "&:hover": {
                      backgroundColor: "#009e47", // Color on hover
                    },
                  }}
                  component="label"
                  className="flex items-center justify-center cursor-pointer w-1/2 h-11 text-text1 rounded-md"
                  onClick={() => {
                    // Handle the second button click
                  }}
                  isLoading={isSubmitLoading}
                >
                  <span className="text-white">Cập nhật </span>
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default ModalSkillDetailAdmin;
