// @flow
import React from "react";
import { Map, ImageOverlay, Marker, LayersControl } from "react-leaflet";
import Leaflet from "leaflet";

export type Point = [number, number];

const convertPoint = (p: Point) => [-p[1], p[0]];

export type ControlMapProps = {
  width: number,
  height: number,
  zoom: number,
  layers: Array<Layer>,
  controls: Controls
};

export default class ControlMap extends React.Component<ControlMapProps> {
  constructor(props: SpaceMapProps) {
    super(props);
  }

  get center(): Point {
    return convertPoint([
      this.props.width / 2,
      this.props.height / 2
    ]);
  }

  render() {
    return (
      <Map center={this.center}
        zoom={this.props.zoom}
        crs={Leaflet.CRS.Simple}>
        {this.renderMarkers()}
        {this.renderLayers()}
      </Map>
    );
  }

  renderMarkers() {
    return Object.values(this.props.controls).map(this.renderMarker.bind(this));
  }

  createLeafletIcon(iconRaw: string) {
    const icon = iconRaw.split(" ").map(name => "mdi-".concat(name)).join(" ");
    return Leaflet.divIcon({
      className: `mdi mdi-36px ${icon}`,
      iconSize: Leaflet.point(36, 36),
      iconAnchor: Leaflet.point(18, 18)
    });
  }

  renderMarker(control: Control) {
    return (
      <Marker position={convertPoint(control.position)}
        key={control.name}
        icon={this.createLeafletIcon(control.icon)}
      >
      </Marker>
    );
  }

  renderLayers() {
    return (
      <LayersControl position="topright">
        {this.props.layers.map(this.renderLayer)}
      </LayersControl>
    );
  }

  renderLayer(layer: Layer) {
    const LayersControlType =
      layer.baseLayer ? LayersControl.BaseLayer : LayersControl.Overlay;
    return (
      <LayersControlType
        key={layer.name}
        name={layer.name}
        checked={layer.defaultVisibility === "visible"}>
        <ImageOverlay url={layer.image}
          bounds={Object.values(layer.bounds).map(convertPoint)}
          opacity={layer.opacity} />
      </LayersControlType>
    );
  }
}
