import { ClassNames } from "@emotion/react";
import { TextField } from "@mui/material";
import { makeStyles } from '@mui/styles';

const CreatePostForm = ({
    values,
    handleChange,
    handleSubmit,
}) => {

    const { tema, texto } = values;


    const useStyles = makeStyles((theme) => ({
        input: {
          color: "#FFF",
        },
      }));

    const classes = useStyles();

    return(
        <>
        <div style={{backgroundColor: "rgb(29, 30, 36)",borderColor:"rgb(54, 56, 69)"}} className="card mb-5 mt-3">
            <h1 className="m-3" style={{display: 'block', width: '100%'}}>Nuevo post</h1>
            <form onSubmit={handleSubmit} className="d-flex align-items-center m-3 flex-wrap ">
                <TextField id="outlined-basic" label="Tema" variant="outlined" placeholder="Tema" value={tema} name="tema" onChange={handleChange} fullWidth className='m-2'/>
                <TextField
                id="outlined-multiline-static"
                label="Contenido"
                multiline
                rows={4}
                fullWidth
                value={texto}
                name="texto"
                className='m-2 text-white'
                onChange={handleChange}
                inputProps={{className:ClassNames.input}}
                />
                <button className="btn btn-primary m-1">+ Imagen</button>
                <div className="d-flex justify-content-between m-2">
                    <button type="submit" className="btn btn-primary m-1">Publicar</button>
                </div>
            </form>
        </div>
        </>
    )

}

export default CreatePostForm;