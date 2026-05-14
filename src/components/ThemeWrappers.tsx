// The "Clean" version
interface ThemeWrapperProps {
    theme: "magic" | "serious";
    children: React.ReactNode;
}

export const ThemeWrapper = ({
    theme,
    children,
}: ThemeWrapperProps) => {
    return (
        <div className={`theme-${theme} layout-container`}>
            {children}
        </div>
    );
};
