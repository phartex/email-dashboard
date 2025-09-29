import React from "react";

interface CenteredPageProps {
  children: React.ReactNode;
}

const CenteredPage: React.FC<CenteredPageProps> = ({ children }) => {
  return (
    <div className="flex items-center justify-center h-screen w-full">
        <span className="text-5xl font-bold"> {children}</span>
     
    </div>
  );
};

export default CenteredPage;
