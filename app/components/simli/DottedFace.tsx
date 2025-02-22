
import Image from 'next/image';
import dottedface from '@/public/assets/media/dottedface.gif';

export default function DottedFace(props: any) {
    return (
    
        <div className="flex justify-center items-center bg-black rounded-2xl">
           <Image 
                src={dottedface} 
                alt="loading..." 
                width={350}
                height={350}
            />
        </div>
    );
}