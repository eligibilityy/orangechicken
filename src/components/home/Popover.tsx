"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Drumstick } from "lucide-react";
import Discord from "@/components/home/Discord";
import Weather from "@/components/home/Weather";

export function Popup() {
  return (
    <div className="fixed bottom-5 right-5">
      <Popover>
        <PopoverTrigger asChild>
          <Button className="rounded-full w-12 h-12" variant="default" size="icon">
            <Drumstick className="scale-125" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[315px] sm:w-96 mb-4 mr-4">
          <div className="space-y-4">
            <Discord/>
            <Weather />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
