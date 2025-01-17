"use client";

import { observer } from "mobx-react";
import { Disclosure } from "@headlessui/react";
// components
import {
  ActiveCycleProductivity,
  ActiveCycleProgress,
  ActiveCycleStats,
  CycleListGroupHeader,
  CyclesListItem,
} from "@/components/cycles";
import { EmptyState } from "@/components/empty-state";
// constants
import { EmptyStateType } from "@/constants/empty-state";
import { useCycle } from "@/hooks/store";
import { ActiveCycleIssueDetails } from "@/store/issue/cycle";
import useCyclesDetails from "./use-cycles-details";

interface IActiveCycleDetails {
  workspaceSlug: string;
  projectId: string;
}

export const ActiveCycleRoot: React.FC<IActiveCycleDetails> = observer((props) => {
  const { workspaceSlug, projectId } = props;
  const { currentProjectActiveCycle, currentProjectActiveCycleId } = useCycle();
  const {
    handleFiltersUpdate,
    cycle: activeCycle,
    cycleIssueDetails,
  } = useCyclesDetails({ workspaceSlug, projectId, cycleId: currentProjectActiveCycleId });

  return (
    <>
      <Disclosure as="div" className="flex flex-shrink-0 flex-col" defaultOpen>
        {({ open }) => (
          <>
            <Disclosure.Button className="sticky top-0 z-[2] w-full flex-shrink-0 border-b border-custom-border-200 bg-custom-background-90 px-7 py-1 cursor-pointer">
              <CycleListGroupHeader title="Active cycle" type="current" isExpanded={open} />
            </Disclosure.Button>
            <Disclosure.Panel>
              {!currentProjectActiveCycle ? (
                <EmptyState type={EmptyStateType.PROJECT_CYCLE_ACTIVE} size="sm" />
              ) : (
                <div className="flex flex-col bg-custom-background-90 border-b border-custom-border-200">
                  {currentProjectActiveCycleId && (
                    <CyclesListItem
                      key={currentProjectActiveCycleId}
                      cycleId={currentProjectActiveCycleId}
                      workspaceSlug={workspaceSlug}
                      projectId={projectId}
                      className="!border-b-transparent"
                    />
                  )}
                  <div className="bg-custom-background-100 pt-3 pb-6 px-6">
                    <div className="grid grid-cols-1 bg-custom-background-100 gap-3 lg:grid-cols-2 xl:grid-cols-3">
                      <ActiveCycleProgress
                        handleFiltersUpdate={handleFiltersUpdate}
                        projectId={projectId}
                        workspaceSlug={workspaceSlug}
                        cycle={activeCycle}
                      />
                      <ActiveCycleProductivity
                        workspaceSlug={workspaceSlug}
                        projectId={projectId}
                        cycle={activeCycle}
                      />
                      <ActiveCycleStats
                        workspaceSlug={workspaceSlug}
                        projectId={projectId}
                        cycle={activeCycle}
                        cycleId={currentProjectActiveCycleId}
                        handleFiltersUpdate={handleFiltersUpdate}
                        cycleIssueDetails={cycleIssueDetails as ActiveCycleIssueDetails}
                      />
                    </div>
                  </div>
                </div>
              )}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
});
