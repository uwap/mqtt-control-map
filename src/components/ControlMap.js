// @flow
import React from "react";
import { Map, ImageOverlay, Marker, LayersControl } from "react-leaflet";
import Leaflet from "leaflet";
import _ from "lodash";
import parseIconName, { controlGetIcon } from "utils/parseIconName";

import type { Controls, Control } from "config/types";

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

export default class ControlMap extends React.Component<ControlMapProps> {
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
        crs={Leaflet.CRS.Simple}>
        {this.renderMarkers()}
        {this.renderLayers()}
      </Map>
    );
  }

  renderMarkers() {
    return _.map(this.props.controls, this.renderMarker.bind(this));
  }

  createLeafletIcon(control: Control) {
    const icon = controlGetIcon(control, this.props.state);
    const iconClass = parseIconName(`${icon} 36px`);
    return Leaflet.divIcon({
      iconSize: Leaflet.point(36, 36),
      iconAnchor: Leaflet.point(18, 18),
      html: `<i class="${iconClass}"
          style="line-height: 1; color: ${this.iconColor(control)}"></i>`
    });
  }

  iconColor(control: Control): string {
    const ints = _.mapValues(this.props.state, (x) => x.internal || x.actual);
    const acts = _.mapValues(this.props.state, (x) => x.actual);
    if (control.iconColor != null) {
      return control.iconColor(ints, acts, this.props.state);
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
