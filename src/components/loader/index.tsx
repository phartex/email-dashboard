import { ButtonLoading } from "../ui/button";

const FullPageLoader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-md">
      <ButtonLoading className="h-10 w-10" />
    </div>
  );
};

export default FullPageLoader;
