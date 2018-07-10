// @flow
import React from "react";
import { Map, ImageOverlay, Marker, LayersControl } from "react-leaflet";
import { CRS, point, divIcon } from "leaflet";
import map from "lodash/map";

import type { Controls, Control } from "config/flowtypes";

export type Point = [number, number];

const convertPoint = ([y, x]: Point): Point => [-x, y];

export type ControlMapProps = {
  width: number,
  height: number,
  zoom: number,
  layers: Array<Layer>,
  controls: Controls,
  onChangeControl: (control: Control) => void,
  state: State
};

export default class ControlMap extends React.PureComponent<ControlMapProps> {
  constructor(props: ControlMapProps) {
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
        crs={CRS.Simple}
        leaflet={{}}>
        {this.renderMarkers()}
        {this.renderLayers()}
      </Map>
    );
  }

  renderMarkers() {
    return map(this.props.controls, this.renderMarker.bind(this));
  }

  createLeafletIcon(control: Control) {
    const icon = control.icon(this.props.state);
    const iconClass = `${icon} mdi-36px`;
    return divIcon({
      iconSize: point(36, 36),
      iconAnchor: point(18, 18),
      html: `<i class="${iconClass}"
          style="line-height: 1; color: ${this.iconColor(control)}"></i>`
    });
  }

  iconColor(control: Control): string {
    if (control.iconColor != null) {
      return control.iconColor(this.props.state);
    }
    return "#000";
  }

  renderMarker(control: Control, key: string) {
    return (
      <Marker position={convertPoint(control.position)}
        key={key}
        icon={this.createLeafletIcon(control)}
        onClick={() => this.props.onChangeControl(control)}
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
        checked={layer.defaultVisibility === "visible"}
        removeLayer={(_layer) => {}}
        removeLayerControl={(_layer) => {}}
        addOverlay={(_layer, _name, _checked) => {}}
        addBaseLayer={(_layer, _name, _checked) => {}}>
        <ImageOverlay url={layer.image}
          bounds={[
            convertPoint(layer.bounds.topLeft),
            convertPoint(layer.bounds.bottomRight)
          ]}
          opacity={layer.opacity || 1} />
      </LayersControlType>
    );
  }
}
