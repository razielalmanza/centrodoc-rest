import { CdItem } from "../../model/entity/CdItem";
import { getConnection } from "typeorm";
import { CatValues } from "../../model";

class CatValuesDAO {
  public catRequest(params: any, page: any): Promise<CatValues[]> {
    // aquí puede ser display_value o value
    return (
      getConnection()
        .getRepository(CatValues)
        .createQueryBuilder("catValue")
        .select("display_value")
        .distinct(true)
        .where("catValue.tname = :tname and catValue.fname = :fname", params)
        .take(page.take)
        .skip(page.skip)
        //.orderBy(pagina.orderBy, pagina.order)
        .getRawMany()
    );
  }

  public catRequestCount(params: any): Promise<Number> {
    // aquí puede ser display_value o value
    return (
      getConnection()
        .getRepository(CatValues)
        .createQueryBuilder("catValue")
        .select("display_value")
        .distinct(true)
        .where("catValue.tname = :tname and catValue.fname = :fname", params)
        //.orderBy(pagina.orderBy, pagina.order)
        .getCount()
    );
  }
  public tipoItem(): Promise<CdItem[]> {
    return getConnection()
      .getRepository(CdItem)
      .createQueryBuilder()
      .select("tipo_item")
      .distinct(true)
      .getRawMany();
  }
}

const catValuesDAO: CatValuesDAO = new CatValuesDAO();

export default catValuesDAO;
