import React from 'react';
import {avatarStyles} from "./style";
import CropImageDialog from "./crop-image";
import {useTranslation} from "react-i18next";
import toast from "../util/notification-snackbar.util";
import {IconButton, Paper} from "@material-ui/core";
import {buildAvatarURL} from "../util/function-utils";
import {DeleteOutline, EditOutlined} from "@material-ui/icons";

interface IUCMAvatar {
    setResultAvatar: React.Dispatch<React.SetStateAction<File| undefined>>
    deleteAvatar?: () => void,
    avatarUrl?: string,
    height?: number
    width?: number
}

const UCMAvatar = ({setResultAvatar, avatarUrl, deleteAvatar, ...props}: IUCMAvatar) => {
    const previewCanvasRef = React.useRef<HTMLCanvasElement>(null);
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const [preview, setPreview] = React.useState<string>('');
    const [modalOpen, setModalOpen] = React.useState(false);
    const [selectedFile, setSelectedFile] = React.useState<File>();
    const [croppedImage, setCroppedImage] = React.useState<File>();
    const {t} = useTranslation(["error"]);
    const classes = avatarStyles();

    // React.useEffect(() => {
    //     const canvas = previewCanvasRef.current;
    //     const avatarHeight = height ?? 200;
    //     const avatarWidth = width ?? 200;
    //     if (!canvas || !selectedFile) {
    //         return;
    //     }
    //     const reader = new FileReader();
    //     const image = new Image()
    //     reader.onloadend = () => {
    //         image.src = reader.result as string;
    //     }
    //     reader.readAsDataURL(selectedFile);
    //
    //     image.onload = () => {
    //         const scaleX = image.naturalWidth / image.width;
    //         const scaleY = image.naturalHeight / image.height;
    //         const ctx = canvas.getContext("2d");
    //
    //         const pixelRatio = window.devicePixelRatio;
    //         canvas.width = avatarWidth * pixelRatio;
    //         canvas.height = avatarHeight * pixelRatio;
    //
    //         if (!ctx) {
    //             return;
    //         }
    //
    //         ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    //         // ctx.imageSmoothingEnabled = false; only to crop image/jpeg
    //         ctx.imageSmoothingQuality = "high"
    //
    //         ctx.drawImage(
    //             image,
    //             25 * scaleX,
    //             25 * scaleY,
    //             avatarWidth * scaleX,
    //             avatarHeight * scaleY,
    //             0,
    //             0,
    //             avatarWidth,
    //             avatarHeight
    //         );
    //
    //         canvas.toBlob((blob) => {
    //             if (!blob || !image) {
    //                 return;
    //             }
    //             const newFile = new File(
    //                 [blob],
    //                 "avatar.png",
    //                 {type: "image/png", lastModified: Date.now()}
    //             );
    //             setCroppedImage(newFile);
    //             setResultAvatar(newFile);
    //         });
    //     }
    // }, [selectedFile])

    const onCropSave = (image: File) => {
        setCroppedImage(image)
        setResultAvatar(image)
    }

    const getAvatarSrc = () => {
        if (avatarUrl && !preview && !selectedFile) {
            return buildAvatarURL(avatarUrl)
        } else if (preview && (selectedFile || croppedImage)) {
            return preview;
        } else {
            return "../../user.svg";
        }
    }

    React.useEffect(() => {
        const image = croppedImage || selectedFile;
        if (image) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string)
            }
            reader.onerror = function () {
                toast.error(t('upload'))
            };
            reader.readAsDataURL(image);

        } else {
            setPreview('')
        }
    }, [selectedFile, croppedImage]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div>
            <label htmlFor="button-file">
                <input
                    type="file"
                    id="button-file"
                    name="avatar"
                    accept="image/png, image/jpeg"
                    style={{display: "none"}}
                    ref={fileInputRef}
                    onChange={(event) => {
                        const file = event.target.files && event.target.files[0];
                        if (file && file.type.substr(0, 5) === "image") {
                            setResultAvatar(file);
                            setSelectedFile(file);
                            setCroppedImage(undefined);
                            event.target.value = ''
                        } else {
                            setResultAvatar(undefined);
                            setSelectedFile(undefined);
                            setCroppedImage(undefined);
                        }
                    }}
                />
                <Paper
                    elevation={3}
                    className={classes.cover}
                    style={{width: props.width ?? 200, height: props.height ?? 200}}
                >
                    <img alt={selectedFile ? selectedFile.name : "avatar"}
                         className={classes.picture}
                         style={{width : props.width ?? 200, height: props.height ?? 200}}
                         src={getAvatarSrc()}/>

                </Paper>
            </label>
            { selectedFile &&
            <IconButton aria-label="edit">
                <EditOutlined onClick={() => {
                    setCroppedImage(undefined)
                    setModalOpen(true)
                }}/>
            </IconButton>
            }
            {
                (selectedFile || avatarUrl) &&
                <IconButton aria-label="delete">
                    <DeleteOutline onClick={() => {
                        if (selectedFile || croppedImage) {
                            setResultAvatar(undefined)
                            setCroppedImage(undefined)
                            setSelectedFile(undefined)
                        }
                        if (deleteAvatar && avatarUrl && !selectedFile && !croppedImage) {
                            deleteAvatar()
                        }
                    }}/>
                </IconButton>
            }
            {
                selectedFile &&
                <CropImageDialog
                    onSave={onCropSave}
                    openCrop={modalOpen}
                    onClose={setModalOpen}
                    imgWidth={props.width}
                    imgHeight={props.height}
                    selectedImage={selectedFile}
                />
            }
            <canvas ref={previewCanvasRef} style={{ width: 0, height: 0 }} />
        </div>
    );
};

export default UCMAvatar;