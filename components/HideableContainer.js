import React, { useState } from "react";
import { withTranslation } from "../utils/i18n";

const HideableContainer = ({ t, children, initialHidden, title }) => {
	console.log("initialHidden", initialHidden);

	const [showContent, setShowContent] = useState(!initialHidden);

	return (
		<>
			<div className="status-container">
				<button
					className="btn-toggle-status btn-toggle-status-left"
					onClick={() => setShowContent(!showContent)}
				>
					{title}
				</button>
				<button
					className="btn-toggle-status btn-toggle-status-right"
					onClick={() => setShowContent(!showContent)}
				>
					{t("ui.show hide")}
				</button>

				{showContent && children}
			</div>
			<style>{`
                .status-container {
                    border-top: 1px solid #e1e1e1;
                    border-bottom: 1px solid #e1e1e1;
                    position: relative;
                    min-height: 14px;
                    margin-bottom: 1em;
                }
                
                .status-container-content {
                    margin-top: 10px;
                    margin-bottom: 10px;
                }

                .btn-toggle-status-left {
                    left: -10px;
                }

                .btn-toggle-status-right {
                    right: -10px;
                }
                
                .btn-toggle-status {
                    position: absolute;
                    top: -5px;
                    padding: 2px 10px;
                    line-height: 1em;
                    height: 16px;
                    border: none;
                    font-size: 10px;
                    text-transform: none;
                    color: #999;
                }
            `}</style>
		</>
	);
};

export default withTranslation("common")(HideableContainer);
