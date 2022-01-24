import * as C from './style';

export const PhotoItem = ({ key, url, name, del=() => {}}) => {
    return(
        <C.Container>
            <button onClick={() => del(name)}>❌</button>
            <img src={url} alt={name} />
            {name}
        </C.Container>

    );
}