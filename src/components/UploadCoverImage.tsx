import { useLocalStorage } from "../hooks/useStorage";
import { Btn, Icons, CardStyle } from "./ui";
import { ChangeEvent, FC, useRef } from "react";
import { toast } from "react-toastify";

interface UploadCoverImageProps {}

const UploadCoverImage: FC<UploadCoverImageProps> = ({}) => {
	const [imagePreview, setImagePreview] = useLocalStorage("coverImage", "");
	const inputImageRef = useRef<HTMLInputElement>(null);
	const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];

		if (file) {
			const maxSize = 1024 * 1024; //? 1mb
			const inputImage = inputImageRef.current;
			if (!inputImage) return;
			if (file.size >= maxSize) {
				inputImage.value = "";
				toast("over size file", { type: "error" });
				return;
			}
			const reader = new FileReader();

			reader.onload = () => {
				setImagePreview(reader.result as string);
			};

			reader.readAsDataURL(file);
		}
	};
	return (
		<CardStyle title="Upload cover image">
			<div className="  px-4 py-8">
				<div className=" bg-sky-400 relative h-[210px]  ">
					<input
						id="coverImage"
						ref={inputImageRef}
						accept="image/*"
						onChange={handleImageChange}
						type="file"
						className=" file:absolute file:inset-0  "
					/>
					<div className=" pointer-events-none  absolute border-2 flex flex-col justify-center items-center  inset-0 border-dashed  bg-white">
						<Icons.upload className=" w-[33px] h-[33px]" />
						<p>Upload cover image</p>
						<p className=" text-gray-400">
							16:9 ratio is recommended. Max image size 1mb
						</p>
					</div>
				</div>
			</div>
			{imagePreview && (
				<div className="absolute inset-0 flex flex-col justify-between">
					<img
						src={imagePreview}
						className="pointer-events-none flex-1  object-cover"
						alt=""
					/>
					<div className=" absolute bottom-0 left-0 bg-white h-12 flex items-center w-full">
						<Btn
							onClick={() => {
								setImagePreview("");
								if (inputImageRef.current) {
									inputImageRef.current.value = "";
								}
							}}
							variant="ghost"
							theme="alert"
						>
							<Icons.error />
							delete & re-upload
						</Btn>
					</div>
				</div>
			)}
		</CardStyle>
	);
};

export default UploadCoverImage;
