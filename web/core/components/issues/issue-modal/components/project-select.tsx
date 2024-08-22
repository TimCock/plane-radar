"use client";

import React from "react";
import { observer } from "mobx-react";
import { Control, Controller } from "react-hook-form";
// types
import { TIssue } from "@plane/types";
// components
import { ProjectDropdown } from "@/components/dropdowns";
// helpers
import { getTabIndex } from "@/helpers/issue-modal.helper";
import { shouldRenderProject } from "@/helpers/project.helper";
// store hooks
import { useUser } from "@/hooks/store";

type TIssueProjectSelectProps = {
  control: Control<TIssue>;
  disabled?: boolean;
  handleFormChange: () => void;
};

export const IssueProjectSelect: React.FC<TIssueProjectSelectProps> = observer((props) => {
  const { control, disabled = false, handleFormChange } = props;
  // store hooks
  const { projectsWithCreatePermissions } = useUser();

  return (
    <Controller
      control={control}
      name="project_id"
      rules={{
        required: true,
      }}
      render={({ field: { value, onChange } }) =>
        projectsWithCreatePermissions && projectsWithCreatePermissions[value!] ? (
          <div className="h-7">
            <ProjectDropdown
              value={value}
              onChange={(projectId) => {
                onChange(projectId);
                handleFormChange();
              }}
              buttonVariant="border-with-text"
              renderCondition={(project) => shouldRenderProject(project)}
              tabIndex={getTabIndex("project_id")}
              disabled={disabled}
            />
          </div>
        ) : (
          <></>
        )
      }
    />
  );
});