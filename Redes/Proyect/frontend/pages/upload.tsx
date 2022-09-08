import styles from "../styles/Upload.module.scss"

import { Button, ContentSwitcher, FileUploader, Form, Loading, Select, SelectItem, Switch, TextInput, ToastNotification } from "@carbon/react"
import { Controller, SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form"
import { AnimatePresence, motion } from "framer-motion"
import type { NextPage } from 'next'
import { useState } from "react"
import axios from "axios"

// Types for the form
type Amparo = "nulidad" | "verificacion" | "derecho" | "recuperacion"
type Unidad = "federal" | "estatal" | "municipal"
type DocumentType = "juicio" | "expediente"

type FormData = {
    nombre: string;
    direccion: string;
    folio: string;
    amparo: Amparo;
    tipo_documento: DocumentType;
    unidad: Unidad
    expediente: {
        id: string;
    };
    juicio: {
        id: string;
        juzgado: string;
        distrito: string;
    },
    archivo: File;
};

// Notification interface for the toast
interface NotificationData {
    title: string;
    iconDescription: string;
    caption: string;
    timeout?: number;
    kind: "success" | "error" | "info" | "warning";
}

const Upload: NextPage = () => {
    const { register, handleSubmit, formState: { errors }, control, watch, setValue } = useForm<FormData>({ defaultValues: { tipo_documento: "juicio" } });

    const documentType = watch("tipo_documento")

    const [isLoading, setIsLoading] = useState(false)
    const [notifications, setNotifications] = useState<NotificationData[]>([])

    // Uploads the file to the server and returns the id of the file
    const onSubmit: SubmitHandler<FormData> = async (e) => {
        const formData = new FormData();
        formData.append("file", e.archivo);

        setIsLoading(true);
        let uploadRes;

        try {
            uploadRes = await axios.post("http://localhost:8090" + "/api/docs/load", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            })

        } catch (error) {
            console.log("Error uploading file", error)
            addNotification({
                title: "Error",
                iconDescription: "Error",
                caption: "Error uploading file",
                kind: "error"
            })

            setIsLoading(false);
            return;
        }

        try {

            const uploadData = await uploadRes?.data as { id: string };
            let metadata = { nombre: e.nombre, direccion: e.direccion, folio: e.folio, amparo: e.amparo, unidad: e.unidad, tipo_documento: e.tipo_documento }

            if (documentType === "juicio") {
                Object.defineProperty(metadata, "juicio", e.juicio)
            }

            if (documentType === "expediente") {
                Object.defineProperty(metadata, "expediente", e.expediente)
            }


            await axios.post("http://localhost:8090/api/docs/addData/" + uploadData.id, {
                metadata: metadata,
                tags: [

                ]

            }, {
                headers: { "Content-Type": "application/json" },
            })
        } catch (error) {
            addNotification({
                title: "Error",
                iconDescription: "Error",
                caption: "Error uploading file metadata",
                kind: "error"
            })
        } finally {
            setIsLoading(false);
        }

        addNotification({
            title: "Documento subido",
            iconDescription: "close",
            caption: "El documento se ha subido correctamente",
            kind: "success",
        })

    }

    const onError: SubmitErrorHandler<FormData> = (e) => {
        console.log(e)
    }

    // adds a notification to the notification list and removes it after X seconds
    const addNotification = (notification: NotificationData) => {
        setNotifications([...notifications, notification])
        setTimeout(() => {
            setNotifications(notifications.filter(n => n !== notification))
        }, notification.timeout || 6000)
    }

    return (
        <div className={styles.container}>
            <div className={styles.notifications}>
                {notifications.map((notification, i) => (
                    <ToastNotification
                        key={i}
                        caption={notification.caption}
                        iconDescription={notification.iconDescription}
                        timeout={notification?.timeout || 6000}
                        title={notification.title}
                        kind={notification.kind}

                        onCloseButtonClick={() => {
                            setNotifications(notifications.filter((_, index) => index !== i))
                            console.log(notifications)
                        }}

                    />
                ))}
            </div>
            {isLoading && <Loading description="Active loading indicator" withOverlay={true} />}
            <h3>Sube un nuevo documento</h3>

            <Form className={styles.formContainer} onSubmit={handleSubmit(onSubmit, onError)}>
                <TextInput
                    id='filename-input'
                    type='text'
                    labelText='Nombre del archivo'
                    placeholder='Nombre del archivo'
                    invalid={!!errors.nombre}
                    invalidText={"El nombre del archivo es requerido y debe tener almenos 3 caracteres"}
                    {...register("nombre", {
                        minLength: 3,
                        maxLength: 30,
                        pattern: /^[A-Za-z]+$/,
                        required: true
                    })}
                />
                <TextInput
                    id='folio-input'
                    type='text'
                    labelText='Folio'
                    placeholder='Folio'
                    invalid={!!errors.folio}
                    invalidText={"El folio es requerido y debe tener almenos 3 caracteres"}
                    {...register("folio", {
                        minLength: 3,
                        maxLength: 30,
                        pattern: /^[0-9A-Za-z]+$/,
                        required: true,
                    })}
                />

                <TextInput
                    id='address-input'
                    type='text'
                    labelText='Direccion'
                    placeholder='Direccion'
                    invalid={!!errors.direccion}
                    invalidText={"La direccion es requerida y debe tener almenos 3 caracteres"}
                    {...register("direccion", {
                        minLength: 3,
                        maxLength: 30,
                        pattern: /^.*$/,
                        required: true
                    })}
                />
                <Select
                    id="amparo"
                    labelText="Selecciona un tipo amparo"
                    invalid={!!errors.amparo}
                    invalidText={"Amparo es requerido"}
                    {...register("amparo", {
                        required: true
                    })}
                >
                    <SelectItem value="verificacion" text="Por verificacion" />
                    <SelectItem value="derecho" text="Por derecho de peticion" />
                    <SelectItem value="nulidad" text="Por nulidad" />
                    <SelectItem value="recuperacion" text="Por recuperacion de predio" />
                </Select>

                <Select
                    id="unidad-select"
                    labelText="Selecciona una unidad"
                    invalid={!!errors.unidad}
                    {...register("unidad")}>
                    <SelectItem value="municipal" text="Municipal" />
                    <SelectItem value="federal" text="Federal" />
                    <SelectItem value="estatal" text="Estatal" />
                </Select >

                <Controller
                    render={() => (
                        <ContentSwitcher size="sm" onChange={(e) => {
                            setValue('tipo_documento', e.name?.toString() as DocumentType || "juicio")
                        }} >
                            <Switch name="juicio" text="Juicio" >
                            </Switch>
                            <Switch name="expediente" text="Expediente">
                            </Switch>
                        </ContentSwitcher>
                    )}
                    name="tipo_documento"
                    control={control}
                    rules={{ required: true }}
                />

                {
                    documentType == "juicio" ?
                        <AnimatePresence>
                            <motion.div
                                key={"juicio"}
                                className={styles.formContainer}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 1 }}
                            >
                                <TextInput
                                    id='juico-input'
                                    type='text'
                                    labelText='Juicio'
                                    placeholder='Juicio'
                                    invalid={!!errors.juicio?.id}
                                    invalidText={"El juicio es requerido y debe tener almenos 3 caracteres"}
                                    {...register("juicio.id", {
                                        minLength: 1,
                                        maxLength: 30,
                                        pattern: /^[A-Za-z]+$/,
                                        required: true,
                                        validate: (value) => {
                                            if (!value && documentType == "juicio") return "El campo es requerido"
                                            return
                                        }
                                    })}
                                />
                                <TextInput
                                    id='juzgado-input'
                                    type='text'
                                    labelText='Juzgado'
                                    placeholder='Juzgado'
                                    invalid={!!errors.juicio?.juzgado}
                                    invalidText={"El juzgado es requerido y debe tener almenos 3 caracteres"}
                                    {...register("juicio.juzgado", {
                                        minLength: 1,
                                        maxLength: 30,
                                        pattern: /^[A-Za-z]+$/,
                                        required: true,
                                        validate: (value) => {
                                            if (!value && documentType == "juicio") return "Field is required"
                                            return
                                        }
                                    })}
                                />

                                <Select
                                    id="district-select"
                                    defaultValue="alcaldia alvaro obregon"
                                    labelText="Selecciona un distrito"
                                    invalid={!!errors.juicio?.distrito}
                                    {...register("juicio.distrito", {
                                        validate: (value) => {
                                            if (!value && documentType == "juicio") return "Distrito es requerido"
                                            return
                                        }
                                    })}>
                                    <SelectItem value="alcaldia alvaro obregon" text="Alcaldia Alvaro Obregon" />
                                </Select>
                            </motion.div>
                        </AnimatePresence>
                        : <></>
                }
                {
                    documentType == "expediente" &&
                    <AnimatePresence>
                        <motion.div
                            key={"expediente"}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1 }}
                            className={styles.formContainer}
                        >
                            <TextInput
                                id='expediente-input'
                                type='text'
                                labelText='Expediente'
                                placeholder='Expediente'
                                invalid={!!errors.expediente?.id}
                                invalidText={"Validacion del expediente"}
                                {...register("expediente.id", {
                                    minLength: 1,
                                    maxLength: 30,
                                    pattern: /^.*$/,
                                    required: true,
                                    validate: (value) => {
                                        if (!value && documentType == "expediente") return "Expediente es requerido"
                                        return
                                    }
                                })}
                            />
                        </motion.div>
                    </AnimatePresence>
                }


                <div className="cds--file__container">
                    <FileUploader
                        id="file-uploader"
                        className={styles.fileUploader}
                        accept={[
                            '.pdf',
                        ]}
                        buttonKind="secondary"
                        buttonLabel="Seleccionar archivo"
                        filenameStatus="edit"
                        iconDescription="Clear file"
                        labelDescription="solo archivos .pdf de 500MB maximo"
                        aria-invalid={!!errors.archivo}
                        labelTitle="Subir archivo"
                        multiple={false}
                        {...register("archivo", {
                            required: true,
                            validate: (value) => {
                                if (value.size > 500 * 100_000_000) return "El archivo es muy grande"
                                return true
                            }
                        })}
                        onChange={(e) => {
                            if (e.target.files) {
                                setValue('archivo', e.target.files[0])
                            }
                        }}
                    />
                </div>

                <Button type="submit" color="secondary"> Subir</Button>
            </Form>
        </div>
    )
}

export default Upload;
