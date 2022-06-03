import { Input, InputArea, ErrorMessage } from './styled'
import { Props } from './styled'

export interface TextInputProps {
    placeholder?: string,
    type?: string,
    onChange?: React.ChangeEventHandler<HTMLInputElement>,
    onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>,
    onFocus?: React.FocusEventHandler<HTMLInputElement>,
    styleProps?: Props,
    hasError?: boolean,
    errorMessage?: string
}

export function TextInput(props: TextInputProps) {
    return (
        <InputArea>
            <Input
                placeholder={props?.placeholder}
                type={props?.type}
                onChange={props?.onChange}
                onKeyDown={props?.onKeyDown}
                onFocus={props?.onFocus}
                height={props?.styleProps?.height}
                padding={props?.styleProps?.padding}
            />
            {props.hasError && <ErrorMessage>{props.errorMessage}</ErrorMessage>}
        </InputArea>
    )
}