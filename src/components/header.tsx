import { cn } from "@/lib/utils";

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
    description?: string | null;
    size?: "default" | "sm";
}

export function Header({ title, description, size = "default", className, ...props }: HeaderProps) {
    return (
        <div className={cn("grid gap-1", className)} {...props}>
            <h1
                className={cn(
                    "line-clamp-1 text-3xl font-bold tracking-tight pb-2",
                    size === "default" ? "md:text-5xl" : "md:text-6xl"
                )}
            >
                {title}
            </h1>
            {description ? (
                <p
                    className={cn(
                        "line-clamp-2 font-medium text-base mx-10 md:mx-0",
                        size === "default" ? "md:text-xl text-muted-foreground" : "md:text-2xl text-white"
                    )}
                >
                    {description}
                </p>
            ) : null}
        </div>
    );
}
