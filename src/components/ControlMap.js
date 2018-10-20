// @flow
import React from "react";
import { Map, ImageOverlay, Marker, LayersControl } from "react-leaflet";
import { CRS, point, divIcon } from "leaflet";
import map from "lodash/map";
import filter from "lodash/filter";
import reduce from "lodash/reduce";
import MqttContext from "mqtt/context";
import type { Controls, Control, UIControl, ControlUI } from "config/flowtypes";

export type Point = [number, number];

const convertPoint = ([y, x]: Point): Point => [-x, y];

export type ControlMapProps = {
  width: number,
  height: number,
  zoom: number,
  layers: Array<Layer>,
  controls: Controls,
  search: string,
  onChangeControl: (control: Control) => void
};

const center = (props: ControlMapProps): Point =>
  convertPoint([
    props.width / 2,
    props.height / 2
  ]);

const iconColor = (control: Control, state: State): string => {
  if (control.iconColor != null) {
    return control.iconColor(state);
  }
  return "#000";
};

const createLeafletIcon = (control: Control, state: State) => {
  const icon = control.icon(state);
  const iconClass = `${icon} mdi-36px`;
  return divIcon({
    iconSize: point(36, 36),
    iconAnchor: point(18, 18),
    html: `<i class="${iconClass}"
        style="line-height: 1; color: ${iconColor(control, state)}"></i>`
  });
};

const renderMarker = (props: ControlMapProps) =>
  (control: Control, key: string) => (
    <MqttContext.Consumer key={key}>
      {({ state }) => (
        <Marker position={convertPoint(control.position)}
          icon={createLeafletIcon(control, state)}
          onClick={() => props.onChangeControl(control)}
        >
        </Marker>
      )}
    </MqttContext.Consumer>
  );

const safeIncludes = (o: {+type?: string, +text?: string, +topic?: string},
  s: string) => {
  if (o.type != null) {
    if (o.type.toLowerCase().includes(s)) {
      return true;
    }
  }
  if (o.text != null) {
    if (o.text.toLowerCase().includes(s)) {
      return true;
    }
  }
  if (o.topic != null) {
    if (o.topic.toLowerCase().includes(s)) {
      return true;
    }
  }
  return false;
};

const isVisible = (props: ControlMapProps) =>
  (c: UIControl & {ui?: Array<ControlUI>}) => {
  if (safeIncludes(c, props.search.toLowerCase())) {
    return true;
  }
  if (c.ui != null) {
    return reduce(c.ui,
      (b, e) => b || safeIncludes(e, props.search.toLowerCase()), false);
  }
  return false;
};

const renderMarkers = (props: ControlMapProps) =>
  map(filter(props.controls, isVisible(props)), renderMarker(props));

const renderLayer = (layer: Layer) => {
  const LayersControlType =
    layer.baseLayer ? LayersControl.BaseLayer : LayersControl.Overlay;
  return (
    <LayersControlType
      key={layer.name}
      name={layer.name}
      checked={layer.defaultVisibility === "visible"}
      removeLayer={(_layer) => {}} // eslint-disable-line fp/no-nil
      removeLayerControl={(_layer) => {}} // eslint-disable-line fp/no-nil
      // eslint-disable-next-line fp/no-nil
      addOverlay={(_layer, _name, _checked) => {}}
      // eslint-disable-next-line fp/no-nil
      addBaseLayer={(_layer, _name, _checked) => {}}>
      <ImageOverlay url={layer.image}
        bounds={[
          convertPoint(layer.bounds.topLeft),
          convertPoint(layer.bounds.bottomRight)
        ]}
        opacity={layer.opacity || 1} />
    </LayersControlType>
  );
};

const renderLayers = (props: ControlMapProps) => (
  <LayersControl position="topright">
    {props.layers.map(renderLayer)}
  </LayersControl>
);

const ControlMap = (props: ControlMapProps) => (
  <Map center={center(props)}
    zoom={props.zoom}
    crs={CRS.Simple}
    leaflet={{}}>
    {renderMarkers(props)}
    {renderLayers(props)}
  </Map>
);

export default ControlMap;
