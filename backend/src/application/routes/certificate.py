import io
from fastapi import APIRouter, HTTPException, status, Response
from fastapi.responses import StreamingResponse, JSONResponse
from pydantic import BaseModel
from infra.database.models import Engine
from infra.database.controller.modelSqlite import ModelSqlite
from infra.database.controller.certificateSqlite import CertificateSqlite
from application.usecase.modelCase import ModelCase
from application.usecase.certificateCase import CertificateCase
from application.controller.makePDF import MakePDF
from entity.certificate import Certificate

router = APIRouter()
engine = Engine()


class CertificatePreview(BaseModel):
    name: str
    cpf: str
    date: str
    model_id: int


@router.post("/certificate/save", tags=["save"])
def save(c: CertificatePreview):
    model_repository = ModelSqlite(engine)
    certificate_repository = CertificateSqlite(engine)
    model = ModelCase.get_by_id(model_repository, c.model_id)
    if not model:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Model não encontrado")
    certificate = Certificate(c.name, c.cpf, c.date, model)
    try:
        CertificateCase.create(certificate_repository, certificate)
        return {"message": "Certificado criado com sucesso!"}
    except Exception as e:
        return e
    
@router.post("/certificate/preview", tags=["preview"])
def preview(c: CertificatePreview):
    model_repository = ModelSqlite(engine)
    model = ModelCase.get_by_id(model_repository, c.model_id)
    if not model:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Model não encontrado")
    certificate = Certificate(c.name, c.cpf, c.date, model)
    buffer = MakePDF.preview(certificate)
    return StreamingResponse(io.BytesIO(buffer), media_type="image/png")


@router.get("/certificate/view/{id}")
def view(id: int):
    if not id:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Model não encontrado")
    certificate_repository = CertificateSqlite(engine)
    certificate = CertificateCase.get_by_id(certificate_repository, id)
    pdf_content = MakePDF.construct(certificate)
    response = Response(content=pdf_content, media_type="application/pdf")
    response.headers["Content-Disposition"] = f'inline; filename="{certificate.name}.pdf"; title="Seu Título Personalizado"'
    return response

@router.get("/certificate/list")
def list():
    certificate_repository = CertificateSqlite(engine)
    certificates = CertificateCase.list_all(certificate_repository)
    certificates_json = [certificate.to_dict() for certificate in certificates]
    return JSONResponse(certificates_json, 200)