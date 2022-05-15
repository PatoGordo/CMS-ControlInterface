import { api, handleAxiosError } from "@/api";
import { reactive } from "vue";

export interface ICMS {
  _id: string;
  name: string;
  owner_id: string;
  authorized_urls?: Array<unknown>;
  structure: unknown;
  data: Array<unknown>;
  api_key: string;
  updatedAt: string;
  createdAt: string;
}

export const cmsStore = reactive({
  cmss: [] as ICMS[],
  async getCMSs() {
    try {
      const res = await api.get("/cms/get-cmss");

      this.cmss = res.data.result;
    } catch (err) {
      handleAxiosError(err);
    }
  },
  async insertDataToCMS(id: string, api_key: string, data: unknown) {
    try {
      console.log(id);

      const res = await api.post("/cms/insert-data/" + api_key, {
        id,
        data,
      });

      this.cmss[this.cmss.findIndex((_cms) => _cms._id === id)].data.push(
        res.data.result
      );
    } catch (err) {
      handleAxiosError(err);
    }
  },
  async createCMS(
    name: string,
    structure: unknown[],
    authorized_urls: unknown[]
  ) {
    try {
      const structureObject = {};

      await Promise.all([
        structure.forEach((item) => {
          structureObject[(item as { name: string; type: string }).name] = {
            name: (item as { name: string; type: string }).name,
            type: (item as { name: string; type: string }).type,
          };
        }),
      ]);

      const res = await api.post("/cms/create", {
        name,
        structure: structureObject,
        authorized_urls,
      });

      this.cmss.push(res.data.result);
    } catch (err) {
      handleAxiosError(err);
    }
  },
  getCMS(id: string) {
    const cms = this.cmss.find((_cms) => _cms._id === id);

    return cms;
  },
});
