import React from "react";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import { Message } from "./page";

interface UserTextProps {
	message: Message;
	isDetecting: boolean;
}

export default function UserText({ message, isDetecting }: UserTextProps) {
	return (
		<div className="bg-primary rounded-lg p-3 max-w-[80%] w-fit ml-auto relative">
			<p>{message.text}</p>
			<Badge
				variant={"secondary"}
				className="text-nowrap absolute -bottom-2 right-2"
			>
				Detected Language:{" "}
				{isDetecting ? (
					<Loader2 className="animate-spin size-3 ml-2" />
				) : (
					message.detectedLang
				)}
			</Badge>
		</div>
	);
}
