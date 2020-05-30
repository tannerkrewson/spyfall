import { withTranslation } from "../utils/i18n";

const AccessCode = ({ t, code }) => (
	<>
		<div className="access-code">
			{t("ui.access code")}: <span>{code}</span>
		</div>
		<style>{`
            .access-code {
                margin: .8em;
            }
            .access-code > span {
                font-family: monospace;
                box-shadow: 0 0 10pt 1pt #d3d3d3;
                padding: .4em;
            }
        `}</style>
	</>
);

export default withTranslation("common")(AccessCode);
