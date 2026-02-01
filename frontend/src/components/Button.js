"use client";

export default function Button({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  className = "",
  ...props
}) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 rounded-full font-medium transition";

  const variants = {
    primary:
      "bg-white text-zinc-900 shadow-sm hover:translate-y-[-1px] hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0",
    secondary:
      "border border-white/10 bg-zinc-950 text-[var(--fg)] hover:border-white/20",
    ghost: "text-muted hover:text-[var(--fg)]",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-2.5 text-sm",
    lg: "px-8 py-3 text-base",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={loading}
      {...props}
    >
      {loading ? (
        <>
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          Loading...
        </>
      ) : (
        children
      )}
    </button>
  );
}
