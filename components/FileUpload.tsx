import { ourFileRouter } from "@/app/api/uploadthing/core";
import { UploadDropzone } from "@/lib/uploadthing";
import { toast } from "sonner";

interface FileUploadProps {
    onChange: (url: string) => void;
    endpoint: keyof typeof ourFileRouter
}


export const FileUpload = ({
    endpoint,
    onChange
}: FileUploadProps) => {
    return(
        <UploadDropzone
        endpoint={endpoint}
        onClientUploadComplete={(res)=> {
            onChange(res?.[0].url)
        }}
        onUploadError={(err) => {
            console.log(err)
            toast.error(`Something went wrong: ${err.message}`)
        }}
         />
    )
}