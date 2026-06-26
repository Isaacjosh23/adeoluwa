import CheckIcon from "@/ui/icons/check";
import CloseIcon from "@/ui/icons/close";

interface ToastProps {
  visible: boolean;
  onClose: () => void;
}

function Toast({ visible, onClose }: ToastProps) {
  return (
    <div
      className={`fixed top-[2.4rem] right-[2.4rem] z-1000 w-lg max-w-[calc(100vw-4.8rem)] bg-(--color-dark-2) border-[0.5px] border-(--color-gold-dim) shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all duration-500
        ${visible ? "translate-x-0 opacity-100" : "translate-x-[120%] opacity-0"}`}
    >
      <div className="p-8 flex items-start gap-[1.6rem]">
        {/* Check icon */}
        <div className="w-[3.6rem] h-[3.6rem] rounded-full border-[0.5px] border-(--color-gold) flex items-center justify-center shrink-0 mt-[0.2rem]">
          <CheckIcon className="w-[1.6rem] h-[1.6rem] text-(--color-gold)" />
        </div>

        {/* Text */}
        <div className="flex flex-col gap-[0.4rem] flex-1">
          <p className="font-serif text-[2rem] font-light text-(--color-text-inverse)">
            You&apos;re confirmed!
          </p>
          <p className="font-serif italic font-normal text-[1.7rem] text-(--color-text-muted) leading-[1.6]">
            We can&apos;t wait to celebrate with you on August 15th.
          </p>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="text-(--color-text-muted) hover:text-(--color-gold) transition-colors duration-200 shrink-0 leading-none mt-[0.2rem]"
        >
          <CloseIcon className="size-[1.8rem]" />
        </button>
      </div>

      {/* Animated duration bar */}
      {visible && (
        <div className="h-[0.3rem] bg-(--color-gold-dim) w-full overflow-hidden">
          <div className="h-full bg-(--color-gold) w-full animate-toastBar origin-right" />
        </div>
      )}
    </div>
  );
}

export default Toast;
