
export default function VideoBox(props: any) {
    return (
        <div className="aspect-video flex rounded-2xl overflow-hidden items-center h-[300px] w-[350px] justify-center">
            <video ref={props.video} autoPlay playsInline></video>
            <audio ref={props.audio} autoPlay ></audio>
        </div>
    );
}