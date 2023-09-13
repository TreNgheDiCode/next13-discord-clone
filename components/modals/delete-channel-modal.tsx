"use client";

import qs from "query-string";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import { Button } from "@/components/ui/button";

export const DeleteChannelModal = () => {
  const router = useRouter();

  const { isOpen, onClose, type, data } = useModal();

  const [isLoading, setIsLoading] = useState(false);

  const isModalOpen = isOpen && type === "deleteChannel";
  const { server, channel } = data;

  const onClick = async () => {
    try {
      setIsLoading(true);
      const url = qs.stringifyUrl({
        url: `/api/channels/${channel?.id}`,
        query: {
          serverId: server?.id,
        },
      });

      await axios.delete(url);

      onClose();
      router.refresh();
      router.push(`/servers/${server?.id}`);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Xóa kênh vĩnh viễn
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Bạn xác nhận muốn thực hiện hành động này?
            <br />
            <span className="text-indigo-500 font-semibold">
              #{channel?.name}
            </span>{" "}
            sẽ bị xóa khỏi hệ thống vĩnh viễn!
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="bg-gray-100 px-6 py-4">
          <div className="flex items=center justify-between w-full">
            <Button disabled={isLoading} onClick={onClose} variant={"ghost"}>
              Quay lại
            </Button>
            <Button
              disabled={isLoading}
              variant={"destructive"}
              onClick={onClick}
            >
              Đồng ý
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
