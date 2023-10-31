import React from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const Map = () => {
    const defaultProps = {
        center: {
            lat: 10.762622,
            lng: 106.68257,
        },
        zoom: 11,
    };
    return (
        <div>
            <div style={{ height: '100vh', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: '' }}
                    defaultCenter={defaultProps.center}
                    defaultZoom={defaultProps.zoom}
                >
                    <AnyReactComponent lat={59.955413} lng={30.337844} text="My Marker" />
                </GoogleMapReact>
            </div>
        </div>
    );
};

export default Map;
