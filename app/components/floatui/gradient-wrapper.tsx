const GradientWrapper = (
    { children, background, wrapperClassName, backgroundGradient, divClassName }:
    { children: any, background: string, wrapperClassName: string, backgroundGradient: string, divClassName: string }) => (
    <div
        className={`relative ${divClassName || ""}`}>
        <div className={`absolute m-auto blur-3xl ${wrapperClassName || ""}`}
            style={{
                background:
                    backgroundGradient || "linear-gradient(180deg, #7C3AED 0%, rgba(152, 103, 240, 0.984375) 0.01%, rgba(237, 78, 80, 0.2) 100%)",
            }}>

        </div>
        <div className="relative">
            {children}
        </div>
    </div>
)

export default GradientWrapper