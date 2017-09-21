// @flow
import React from "react";
import { Map, ImageOverlay, Marker, Popup } from "react-leaflet";
import Leaflet from "leaflet";
import R from "ramda";
import Config from "./config";
import { Actions } from "./state";
import { keyOf } from "./util";

import ActionInfo from 'material-ui/svg-icons/action/info';
import ReactDOM from "react-dom";

// convert width/height coordinates to -height/width coordinates
const c = (p) => [-p[1], p[0]]

const color = (iconColor, state: State) => {
  // TODO: give iconColor not only internal but also actual values
  return iconColor == null ? "#000000" :
    iconColor(
      R.map(x => x.internal == null ?
        x.actual : x.internal, state.values == null ? {} : state.values)
    );
}
const iconHtml = (el, state: State) =>
  "<i class=\"material-icons\" style=\""
    + "color:" + color(el.iconColor, state) + ";\">"
    + el.icon + "</i>"

const Markers = (props) => R.values(R.mapObjIndexed((el,key) => (
  <Marker position={c(el.position)} key={el.name}
    icon={Leaflet.divIcon(
      {
        html: iconHtml(el, props.state),
        iconSize: Leaflet.point(32,32)
      })}>
    <Popup
      onOpen={() => props.store.dispatch({type: Actions.CHANGE_UI, payload: key})}
      onClose={() => props.store.dispatch({type: Actions.CHANGE_UI})}>
        <span>{el.name}</span>
    </Popup>
  </Marker>
), R.propOr({}, "controls", Config)));

const SpaceMap = (props: Object) => (
  <Map center={c([props.width / 2, props.height / 2])} zoom={props.zoom}
      crs={Leaflet.CRS.Simple}>
    <ImageOverlay url={props.image}
        bounds={[c([0,0]), c([props.width, props.height])]} />
    {Markers(props)}
  </Map>
);

export default SpaceMap;
