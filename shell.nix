with (import <nixpkgs> {});
stdenv.mkDerivation rec {
  name = "env";
  env = buildEnv { name = name; paths = buildInputs; };
  buildInputs = with pkgs.nodePackages; [
    yarn flow nodejs
  ];
  FLOW_PATH = "${pkgs.flow}/bin/flow";
}
