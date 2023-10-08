import React from "react";
import { WrapperBrandList } from "./style";


const ListBrand = () => {
    return (
        <WrapperBrandList>
            <div className="brand-content">
                <div className="list-brand">
                    <a className="list-brand-item" href="#">
                        <img className="brand-img" src="https://www.pngmart.com/files/10/Apple-Logo-PNG-Photos.png" alt="Apple" />
                    </a>
                    <a className="list-brand-item" href="#">
                        <img className="brand-img" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Samsung_Logo.svg/1024px-Samsung_Logo.svg.png" alt="Samsung" />
                    </a>
                    <a className="list-brand-item" href="#">
                        <img className="brand-img" src="https://assets.stickpng.com/images/60410c7b26ef2b00045692f8.png" alt="Xiaomi" />
                    </a>
                    <a className="list-brand-item" href="#">
                        <img className="brand-img" src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/OPPO_LOGO_2019.svg/2560px-OPPO_LOGO_2019.svg.png" alt="Oppo" />
                    </a>
                    <a className="list-brand-item" href="#">
                        <img className="brand-img" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Redmi_Logo.svg/2560px-Redmi_Logo.svg.png" alt="Redmi" />
                    </a>
                    <a className="list-brand-item" href="#">
                        <img className="brand-img" src="https://companieslogo.com/img/orig/NOK_BIG-8604230c.png?t=1677607482" alt="Nokia" />
                    </a>
                    <a className="list-brand-item" href="#">
                        <img className="brand-img" src="https://logonoid.com/images/huawei-logo.png" alt="Huawei" />
                    </a>
                </div>
            </div>
        </WrapperBrandList>

    )
}

export default ListBrand