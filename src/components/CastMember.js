import defaultAvatar from '../assets/Avatar.svg';


const CastMember = ( props ) => {
    let { name, profilePath, character } = props.cast;
    return(
        <div className={`castMember${profilePath ? '' : ' bgBlue' }`}>
            <div>
                <img src={ profilePath ? profilePath : defaultAvatar } alt={ name }/>
            </div>
            <span>{ name }</span>
            <span>{ character }</span>
        </div>
    );
}

export default CastMember;