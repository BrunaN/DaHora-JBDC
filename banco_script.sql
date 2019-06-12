﻿﻿CREATE TABLE graduacao(
	id SERIAL,
	nome varchar(30) NOT NULL,
	horas int NOT NULL,
	CONSTRAINT graduacao_pkey PRIMARY KEY (id)
);

INSERT INTO graduacao VALUES (1, 'Ciência da Computação', 192);
INSERT INTO graduacao VALUES (2, 'Design Digital', 192);
INSERT INTO graduacao VALUES (3, 'Engenharia da Computação', 192);
INSERT INTO graduacao VALUES (4, 'Engenharia de Softwre', 288);
INSERT INTO graduacao VALUES (5, 'Redes de Computadores', 192);
INSERT INTO graduacao VALUES (6, 'Sistemas de Informação', 288);

CREATE TABLE aluno(
	matricula varchar(6) NOT NULL,
	nome varchar(60) NOT NULL,
	email varchar(60) NOT NULL,
	senha varchar(8) NOT NULL,
	horas int NOT NULL,
	graduacao_id BIGINT NOT NULL,
	CONSTRAINT aluno_pkey PRIMARY KEY (matricula),
	CONSTRAINT aluno_fkey FOREIGN KEY (graduacao_id) REFERENCES graduacao (id)
);

CREATE TABLE certificado(
	id SERIAL,
	matricula_aluno varchar(6) NOT NULL,
	titulo varchar(60) NOT NULL,
	tipo varchar(60) NOT NULL,
	qtd_horas int NOT NULL,
	file varchar(60) NOT NULL,
	CONSTRAINT certificado_pkey PRIMARY KEY (id),
	CONSTRAINT certificado_fkey FOREIGN KEY (matricula_aluno) REFERENCES aluno(matricula)
);

/*DROP VIEW view_horas;*/

CREATE VIEW 
	view_horas 
AS 
	SELECT A.matricula, COALESCE(sum(B.qtd_horas), 0) AS horas 
	FROM Aluno AS A 
		LEFT JOIN Certificado AS B ON B.matricula_aluno = A.matricula
	GROUP BY A.matricula;

/*DROP FUNCTION atualizarhoras(character varying)*/

CREATE OR REPLACE FUNCTION atualizarHoras(m VARCHAR) 
RETURNS BOOLEAN LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN

    UPDATE 
	aluno
    SET 
	horas = COALESCE(B.horas, 0) 
    FROM
	(SELECT * FROM view_horas WHERE matricula = m) as B
    WHERE 
	aluno.matricula = m;
 
    RETURN FOUND;
END;
$$;

/*SELECT atualizarHoras('123456');*/

CREATE OR REPLACE FUNCTION atualizarHorasTrigger() RETURNS TRIGGER AS $hours_update$
    BEGIN
	IF (TG_OP = 'DELETE') THEN
		PERFORM atualizarHoras(OLD.matricula_aluno);
	ELSE
		PERFORM atualizarHoras(NEW.matricula_aluno);
	END IF;
	RETURN NULL;
    END;
 $hours_update$ language plpgsql;

/*drop trigger TRG_AtualizarHoras on certificado;*/

CREATE TRIGGER TRG_AtualizarHoras
AFTER INSERT OR UPDATE OR DELETE ON certificado
FOR EACH ROW EXECUTE PROCEDURE atualizarHorasTrigger();

/*
SELECT * FROM view_horas;

SELECT * FROM certificado;

SELECT * FROM aluno;

insert into certificado (titulo, tipo, qtd_horas, file, matricula_aluno) values ('teste', '0', 10, 'teste.pdf', '358344');
insert into certificado (titulo, tipo, qtd_horas, file, matricula_aluno) values ('teste1', '0', 12, 'teste1.pdf', '358344');
insert into certificado (titulo, tipo, qtd_horas, file, matricula_aluno) values ('teste2', '0', 14, 'teste2.pdf', '358344');
insert into certificado (titulo, tipo, qtd_horas, file, matricula_aluno) values ('teste3', '0', 16, 'teste3.pdf', '358344');

insert into certificado (titulo, tipo, qtd_horas, file, matricula_aluno) values ('teste', '0', 10, 'teste.pdf', '123456');
insert into certificado (titulo, tipo, qtd_horas, file, matricula_aluno) values ('teste1', '0', 10, 'teste1.pdf', '123456');
insert into certificado (titulo, tipo, qtd_horas, file, matricula_aluno) values ('teste2', '0', 14, 'teste2.pdf', '123456');
insert into certificado (titulo, tipo, qtd_horas, file, matricula_aluno) values ('teste3', '0', 16, 'teste3.pdf', '123456');
insert into certificado (titulo, tipo, qtd_horas, file, matricula_aluno) values ('teste4', '0', 16, 'teste4.pdf', '123456');
insert into certificado (titulo, tipo, qtd_horas, file, matricula_aluno) values ('teste5', '0', 16, 'teste5.pdf', '123456');
insert into certificado (titulo, tipo, qtd_horas, file, matricula_aluno) values ('teste6', '0', 16, 'teste6.pdf', '123456');

delete from certificado where matricula_aluno = '123456';

insert into certificado (titulo, tipo, qtd_horas, file, matricula_aluno) values ('teste6', '0', 16, 'teste6.pdf', '123456');

update certificado set titulo = 'teste12313', tipo = '1', qtd_horas = 50, file = 'teste123123' where id = 44;
*/