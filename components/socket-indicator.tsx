"use client";

import { useSocket } from "@/components/provider/socket-provider";
import { Badge } from "@/components/ui/badge";

const SocketIndicator = () => {
  const { isConnected } = useSocket();

  if (!isConnected) {
    return (
      <Badge
        variant={"outline"}
        className="bg-yellow-600 text-white border-none"
      >
        Đang tải: Đang ổn định tín hiệu...
      </Badge>
    );
  }

  return (
    <Badge
      variant={"outline"}
      className="bg-emerald-600 text-white border-none"
    >
      Trực tiếp: Kết nối ổn định
    </Badge>
  );
};

export default SocketIndicator;
