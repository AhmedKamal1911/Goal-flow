"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import AddGoalForm from "./add-goal-form";
import { useState } from "react";

export default function AddGoalDialog() {
  const [openModal, setOpenModal] = useState(false);
  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogTrigger asChild>
        <Button
          variant={"secondary"}
          className="cursor-pointer capitalize text-[18px]"
        >
          add goal
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="capitalize">create goal</DialogTitle>
        </DialogHeader>
        <AddGoalForm setOpenModal={setOpenModal} />
        <DialogDescription className="sr-only">
          dialog for adding goal
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
