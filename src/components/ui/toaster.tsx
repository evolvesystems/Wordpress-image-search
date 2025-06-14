
import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"

// Custom ToastViewport to fix at the top of the screen
function TopToastViewport(props: React.ComponentProps<typeof ToastViewport>) {
  return (
    <ToastViewport
      {...props}
      className="fixed top-0 left-1/2 -translate-x-1/2 z-[100] w-full max-w-md px-4"
      style={{ right: "unset", bottom: "unset" }}
    />
  );
}

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <TopToastViewport />
    </ToastProvider>
  )
}
