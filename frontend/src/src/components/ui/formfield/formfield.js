import React from 'react';
import './formfield.css';
import { FormControl, Select, MenuItem, InputLabel, withStyles } from '@material-ui/core';

const styles = {
    root: {
      color: "white",
      marginBottom: 20,
      textAlign: "center",
      padding: "5px",
      borderRadius: "40px",
      border: "3px solid #00ffff",
      backgroundColor: "#0a0c0d",
      fontSize: "1.2rem",
      height: "2rem",
      width: "280px"
    },
    formControl: {
      minWidth: 120,
      color: "white",
      width: "100%",
    },
  };
const FormField = ({ classes, formdata, id, change, style }) => {

    const showError = () => {
        let errorMesage = <div className="error_label">
            {
                formdata.validation && !formdata.valid ?
                    formdata.validationMessage
                    : null
            }
        </div>
        return errorMesage;
    }

    const renderTemplate = () => {
        let formTemplate = null;
        switch (formdata.element) {
            case ('input'):
                formTemplate = (
                    <div>
                        <span className="input-field">
                            <input
                                style={style}
                                placeholder={formdata.config.label}
                                {...formdata.config}
                                value={formdata.value}
                                onChange={(event) => change({ event, id })}
                            />
                        </span>
                        {showError()}
                    </div>
                )
                break;
            case ('select'):
                formTemplate = (
                    <FormControl classes={{root:classes.root}}>
                        <InputLabel className={classes.formControl}>{formdata.value}</InputLabel>
                        <Select
                            inputProps={{
                                name: "category",
                                id: "category",
                            }}
                        onChange={(event) => change({event, id})}
                        >
                            {formdata.config.options.map(item=>(
                                <MenuItem  value={item}>{item}</MenuItem>    
                            ))}
                        </Select>
                    </FormControl>
                )
                break;
            default:
                formTemplate = null;
        }
        return formTemplate;
    }

    return (
        <div>
            {renderTemplate()}
        </div>
    );
};

export default withStyles(styles)(FormField);
