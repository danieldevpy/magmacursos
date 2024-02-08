import io
import json
from reportlab.pdfgen import canvas
from PIL import Image, ImageFont, ImageDraw
from entity.certificate import Certificate


class MakePDF:

    @classmethod
    def design(cls, img, coords, texts):
        color = (0, 0, 0)
        for coord, text in zip(coords, texts):
            x = coord['x']
            y = coord['y']
            s = coord['size']
            font = ImageFont.truetype('arial.ttf', s)
            design = ImageDraw.Draw(img)
            text_size = design.textlength(text, font)
            center = (x[0] + x[1] - text_size) // 2
            design.text((center, y), text, font=font, fill=color)

    @classmethod
    def preview(cls, certificate: Certificate):
        with io.BytesIO(certificate.model.front) as stream:
            img = Image.open(stream)
            img = img.convert('RGB') 
            value = certificate.model.texts.replace("'", '"')
            coords = json.loads(value)
            texts = [certificate.name.upper(), certificate.formatar_cpf(), certificate.date.upper()]
            cls.design(img, coords, texts)
            buffer = io.BytesIO()
      
            img.save(buffer, format='JPEG', quality=50)
            buffer.seek(0)
            return buffer.read()

    @classmethod
    def construct(cls, certificate: Certificate):
        with io.BytesIO(certificate.model.front) as stream_front, io.BytesIO(certificate.model.back) as stream_back:
            front = Image.open(stream_front)
            back = Image.open(stream_back)
            value = certificate.model.texts.replace("'", '"')
            coords = json.loads(value)
            texts = [certificate.name.upper(), certificate.formatar_cpf(), certificate.date.upper()]
            cls.design(front, coords, texts)
            page_width = max(front.width, back.width)
            page_height = max(front.height, back.height)
            pdf_buffer = io.BytesIO()
            c = canvas.Canvas(pdf_buffer, pagesize=(page_width, page_height))
            c.drawInlineImage(front, 0, 0, width=front.width, height=front.height)
            c.showPage()
            c.drawInlineImage(back, 0, 0, width=back.width, height=back.height)
            c.save()
            return pdf_buffer.getvalue()