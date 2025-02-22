import { ExclamationTriangleIcon } from "@radix-ui/react-icons"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

export function ErrorAlert({ message }: {message?: string}) {    
    return (
    <div>
        <Alert variant="destructive" className="max-w-sm fixed bottom-10 right-10">
            <ExclamationTriangleIcon className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
                {message}
            </AlertDescription>
        </Alert>
    </div>
    );
}