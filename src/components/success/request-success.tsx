import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Image from "next/image";
import WarningCircle from "@/assets/images/SuccessCircle.svg";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useUIStore } from "@/store/ui";


const RequestSuccess: React.FC = () => {
  const { successData, setShowSuccessModal } = useUIStore();

  return (
    <Dialog
      open={!!successData.status}
      onOpenChange={() => {
        setShowSuccessModal({ status: false });
      }}
    >
      <DialogContent
        aria-describedby="success"
        className="flex h-[280px] flex-col items-center justify-center"
      >
        <DialogTitle>
          <Image
            src={WarningCircle}
            alt="KYC approved"
            className="mx-auto"
            width={97}
            height={97}
          />
        </DialogTitle>

        <div className="w-full shrink-0 space-y-4 text-center">
          <h3 className="text-xl font-bold">{successData.title}</h3>
          <p className="text-gray-500">{successData.message}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RequestSuccess;
