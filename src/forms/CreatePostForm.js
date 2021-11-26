import { useRef } from "react";

const CreatePostForm = ({
    values,
    handleChange,
    handleSubmit,
    handleImageChange,
    preview,
    removeImage
}) => {

    const { tema, texto } = values;

    const fileInputRef = useRef();

    return(
        <>
        <div style={{backgroundColor: "rgb(29, 30, 36)",borderColor:"rgb(54, 56, 69)"}} className="card mb-5 m-1 mt-3">
            <h2 className="m-3 montserrat-font" style={{display: 'block',   color:'#fbb141'}}>Nuevo post</h2>
            <form onSubmit={handleSubmit} className="d-flex align-items-center m-3 flex-wrap ">
                <input 
                placeholder="Tema" 
                id="first_name" 
                type="text" 
                className="validate text-white"
                value={tema}
                name='tema'
                onChange={handleChange}
                />

                <textarea 
                id="textarea2" 
                className="materialize-textarea text-white" 
                data-length="120"
                placeholder='Texto'
                value={texto}
                name='texto'
                onChange={handleChange}
                />
            </form>
            <div className="d-flex justify-content-between m-2">
                    <div className="d-flex justify-content-left">
                        <label htmlFor="upload-photo">
                            <input
                                hidden
                                id="upload-photo"
                                name="upload-photo"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                ref={fileInputRef}
                            />
                            <button className="btn btn-primary m-1" onClick={() => fileInputRef.current.click()}>+ Imagen</button>
                        </label>
                        <button type="submit" className="btn btn-primary m-1" onClick={handleSubmit}>Publicar</button>
                    </div>
                    {preview && <button className="btn btn-primary m-1" onClick={removeImage}>Quitar Imagen</button>}
            </div>
            {preview && <img src={preview} alt='image' className='m-2'/>}
        </div>
        </>
    )

}

export default CreatePostForm;