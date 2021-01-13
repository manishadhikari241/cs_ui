import Vue from 'vue'
import papaparse from 'papaparse'

Vue.prototype.$exportCsv = (data, fileName, columns = null) => {

  const blob = new Blob([papaparse.unparse(data, { columns })], {
    type: 'text/csv;charset=utf-8;'
  });

  const link = document.createElement("a");
  link.style.display = 'none';
  document.body.appendChild(link);
  if (link.download !== undefined) {
    link.setAttribute('href', URL.createObjectURL(blob));
    link.setAttribute('download', `${fileName}.csv`);
    link.click();
  }
  document.body.removeChild(link);
}

