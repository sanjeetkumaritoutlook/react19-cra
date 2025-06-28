// src/components/MyButton.tsx
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _object_spread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _define_property(target, key, source[key]);
        });
    }
    return target;
}
function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
            symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
        }
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function _object_spread_props(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
        ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
function _object_without_properties(source, excluded) {
    if (source == null) return {};
    var target = _object_without_properties_loose(source, excluded);
    var key, i;
    if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for(i = 0; i < sourceSymbolKeys.length; i++){
            key = sourceSymbolKeys[i];
            if (excluded.indexOf(key) >= 0) continue;
            if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
            target[key] = source[key];
        }
    }
    return target;
}
function _object_without_properties_loose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;
    for(i = 0; i < sourceKeys.length; i++){
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
    }
    return target;
}
import { jsx, jsxs } from "react/jsx-runtime";
var MyButton = function(_param) {
    var label = _param.label, _param_variant = _param.variant, variant = _param_variant === void 0 ? "primary" : _param_variant, _param_size = _param.size, size = _param_size === void 0 ? "md" : _param_size, _param_fullWidth = _param.fullWidth, fullWidth = _param_fullWidth === void 0 ? false : _param_fullWidth, _param_loading = _param.loading, loading = _param_loading === void 0 ? false : _param_loading, disabled = _param.disabled, props = _object_without_properties(_param, [
        "label",
        "variant",
        "size",
        "fullWidth",
        "loading",
        "disabled"
    ]);
    var baseStyles = {
        border: "none",
        borderRadius: 8,
        fontWeight: 600,
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        transition: "all 0.2s ease-in-out",
        opacity: disabled || loading ? 0.6 : 1,
        width: fullWidth ? "100%" : "auto"
    };
    var sizeStyles = {
        sm: {
            padding: "6px 12px",
            fontSize: "0.85rem"
        },
        md: {
            padding: "10px 16px",
            fontSize: "1rem"
        },
        lg: {
            padding: "14px 20px",
            fontSize: "1.1rem"
        }
    };
    var variantStyles = {
        primary: {
            backgroundColor: "#007bff",
            color: "#fff"
        },
        secondary: {
            backgroundColor: "#6c757d",
            color: "#fff"
        },
        outline: {
            backgroundColor: "transparent",
            color: "#007bff",
            border: "2px solid #007bff"
        }
    };
    return /* @__PURE__ */ jsxs("button", _object_spread_props(_object_spread({
        disabled: disabled || loading,
        style: _object_spread({}, baseStyles, sizeStyles[size], variantStyles[variant])
    }, props), {
        children: [
            loading ? /* @__PURE__ */ jsx("span", {
                style: {
                    width: 16,
                    height: 16,
                    border: "2px solid #fff",
                    borderTopColor: "transparent",
                    borderRadius: "50%",
                    animation: "spin 1s linear infinite"
                }
            }) : label,
            /* @__PURE__ */ jsx("style", {
                children: "@keyframes spin {\n          0% { transform: rotate(0deg); }\n          100% { transform: rotate(360deg); }\n        }"
            })
        ]
    }));
};
var MyButton_default = MyButton;
// src/components/MyCard.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var MyCard = function(param) {
    var title = param.title, description = param.description, image = param.image, children = param.children, onClick = param.onClick, style = param.style;
    return /* @__PURE__ */ jsxs2("div", {
        onClick: onClick,
        style: _object_spread({
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            backgroundColor: "#fff",
            maxWidth: 320,
            cursor: onClick ? "pointer" : "default",
            transition: "transform 0.2s ease-in-out"
        }, style),
        children: [
            image && /* @__PURE__ */ jsx2("img", {
                src: image,
                alt: title,
                style: {
                    width: "100%",
                    height: 180,
                    objectFit: "cover"
                }
            }),
            /* @__PURE__ */ jsxs2("div", {
                style: {
                    padding: "16px"
                },
                children: [
                    /* @__PURE__ */ jsx2("h3", {
                        style: {
                            margin: "0 0 8px 0",
                            fontSize: "1.25rem"
                        },
                        children: title
                    }),
                    /* @__PURE__ */ jsx2("p", {
                        style: {
                            margin: 0,
                            color: "#666",
                            fontSize: "0.95rem"
                        },
                        children: description
                    }),
                    children && /* @__PURE__ */ jsx2("div", {
                        style: {
                            marginTop: 12
                        },
                        children: children
                    })
                ]
            })
        ]
    });
};
var MyCard_default = MyCard;
export { MyButton_default as MyButton, MyCard_default as MyCard };
