import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAboutEditor } from "../shared/useAboutEditor";
import { CommonFields } from "../shared/CommonFields";

export const TeamVariantEditor: React.FC = () => {
  const {
    activeSection,
    updateField,
    uploadImage,
    addArrayItem,
    removeArrayItem,
    updateArrayItem,
    imageUploadState,
  } = useAboutEditor();

  if (!activeSection) return null;
  const data = activeSection.data;

  // Team member handlers
  const handleAddTeamMember = () => {
    addArrayItem("teamMembers", {
      image: "",
      name: "New Team Member",
      role: "Position",
      description: "Description about this team member",
    });
  };

  const handleRemoveTeamMember = (index: number) => {
    removeArrayItem("teamMembers", index);
  };

  const handleUpdateTeamMember = (index: number, field: string, value: any) => {
    const teamMember = data.teamMembers?.[index] || {};
    updateArrayItem("teamMembers", index, { ...teamMember, [field]: value });
  };

  const handleTeamMemberImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadImage(file, `teamMembers[${index}].image`);
    }
  };

  return (
    <div className='space-y-6'>
      <div>
        <h3 className='text-lg font-medium'>Team Section</h3>
        <div className='mt-3 space-y-4'>
          <CommonFields
            title={data.title}
            backgroundColor={data.backgroundColor}
            onUpdateField={updateField}
          />
        </div>
      </div>

      {/* Team members section */}
      <div className='border-t pt-4 mt-4'>
        <div className='flex justify-between items-center mb-4'>
          <h3 className='text-lg font-medium'>Team Members</h3>
          <Button type='button' onClick={handleAddTeamMember}>
            Add Team Member
          </Button>
        </div>

        {Array.isArray(data.teamMembers) &&
          data.teamMembers.map((member: any, index: number) => (
            <div key={index} className='border rounded-md p-4 mb-4'>
              <div className='flex justify-between mb-2'>
                <h4 className='font-medium'>Team Member #{index + 1}</h4>
                <Button
                  type='button'
                  variant='destructive'
                  onClick={() => handleRemoveTeamMember(index)}
                >
                  Remove
                </Button>
              </div>

              <div className='space-y-4'>
                <div>
                  <Label className='block mb-2'>Name</Label>
                  <Input
                    value={member.name || ""}
                    onChange={(e) =>
                      handleUpdateTeamMember(index, "name", e.target.value)
                    }
                  />
                </div>

                <div>
                  <Label className='block mb-2'>Role</Label>
                  <Input
                    value={member.role || ""}
                    onChange={(e) =>
                      handleUpdateTeamMember(index, "role", e.target.value)
                    }
                  />
                </div>

                <div>
                  <Label className='block mb-2'>Description</Label>
                  <Textarea
                    value={member.description || ""}
                    onChange={(e) =>
                      handleUpdateTeamMember(
                        index,
                        "description",
                        e.target.value
                      )
                    }
                    rows={3}
                  />
                </div>

                <div>
                  <Label className='block mb-2'>Photo</Label>
                  <div className='flex items-center gap-4'>
                    {member.image && (
                      <img
                        src={member.image}
                        alt={member.name}
                        className='w-16 h-16 object-cover rounded-full'
                      />
                    )}
                    <Input
                      type='file'
                      accept='image/*'
                      onChange={(e) => handleTeamMemberImageUpload(e, index)}
                    />
                  </div>
                  {imageUploadState.isUploading && (
                    <div className='mt-2'>
                      Uploading... {imageUploadState.progress}%
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
