/* eslint-disable react/prop-types */
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Providers.css";

function ProvidersList({ provider, updateProvider, deleteProvider }) {
  return (
    <tr>
      <th scope="row">{provider.id}</th>
      <td>{provider.title}</td>
      <td>{provider.mobile}</td>
      <td>{provider.email}</td>
      <td>{provider.price}</td>
      {/*   <td>
        {provider.services.map((item) => (
          <span key={item.value}>{item.label} ,</span>
        ))}
      </td> */}
      <td>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => updateProvider(provider)}
        >
          Edite
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => deleteProvider(provider.id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
export default ProvidersList;
