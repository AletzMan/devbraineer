interface LayoutSubSectionProps {
    children: React.ReactNode;
}

export const LayoutSubSection = ({ children }: LayoutSubSectionProps) => {
    return (
        <div className="flex flex-col gap-2 p-2 h-svh ">
            <div className="flex flex-col p-2 gap-2 border border-base-300 bg-base-100 rounded-sm h-[calc(100svh-5rem)] overflow-y-auto">
                {children}
            </div>
        </div>
    );
};
