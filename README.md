# NodeJs Avançado com Clean Architecture, NestJS e Typescript

Aplicando Clear Code, DDD e Clean Architecture em um projeto Nestjs + Docker + Prisma + Postgres.

![Logo](./github/logo.jpg)

# Sumário

* [Testes](#Testes)
* [Testes Unitários](#testes-unitários)
* [Testes de Integração](#testes-de-integração)
* [DDD](#ddd-domain-driven-design)

## Testes

![TiposDeTestes](./github/tests.png)

Os testes desempenham um papel crucial no desenvolvimento de software, garantindo que o código funcione conforme o esperado e que problemas sejam identificados e corrigidos antes da entrega ao usuário final. A importância dos testes pode ser destacada em vários aspectos:

**1. Qualidade e Confiabilidade**

Os testes asseguram que o software atenda aos requisitos e funcione corretamente em diferentes cenários. Eles ajudam a identificar e corrigir bugs e falhas antes que o software chegue ao usuário, melhorando a qualidade geral e a confiabilidade do produto.

**2. Manutenção e Evolução**

À medida que o software evolui, novos recursos são adicionados e o código é modificado. Testes automatizados permitem verificar rapidamente se essas mudanças introduziram novos problemas. Isso é essencial para manter a integridade do software à medida que ele evolui e para garantir que novas funcionalidades não quebrem o que já foi implementado.

**3. Redução de Custos**

Detectar e corrigir problemas mais cedo no ciclo de desenvolvimento é geralmente menos caro do que fazê-lo depois que o software já foi liberado. Testes eficazes podem reduzir o custo de manutenção e minimizar o impacto financeiro de falhas graves encontradas após o lançamento.

**4. Documentação**

Testes bem projetados servem como uma forma de documentação para o software. Eles mostram como o software deve se comportar e fornecem exemplos de uso e requisitos esperados, ajudando desenvolvedores novos a entender melhor o sistema.

## Testes Unitários

O teste unitário consiste em verificar o comportamento das menores unidades em sua aplicação.
Tecnicamente, isso seria uma classe ou até mesmo um método de classe em línguas orientadas a objetos, e seria um procedimento ou função em línguas processuais e funcionais.
Funcionalmente, pode ser um conjunto de classes intimamente relacionadas. Como um “Cervo” e suas classes de suporte ”Cabeça”, “Rabo” e “Movimento”.
Testes unitários, assim como qualquer teste automatizados não servem principalmente para verificar se uma função específica está funcionando, mas sim para garantir que sua aplicação continue funcionando após alguma alteração em sua base de código.
Os testes unitários precisam funcionar isoladamente porque precisam funcionar rapidamente.
Todo o conjunto de testes unitários de uma aplicação precisa funcionar em minutos, de preferência em segundos.

**Quais os benefícios de um teste unitário?**

A importância do teste unitário é inegável, pois além de garantir a qualidade e a funcionalidade do código, ele também ajuda a evitar problemas mais sérios no futuro, pois erros são identificados e corrigidos de forma mais eficiente. Ademais, ele permite que os desenvolvedores trabalhem de forma mais ágil, pois eles podem fazer mudanças no código sem medo de quebrar outras partes do software.

* Melhoria da qualidade do código.
* Maior confiança na modificação.
* Aceleração do processo de desenvolvimento.
* Redução dos custos.
* Melhoria da colaboração.

## Testes de Integração

Teste de integração é a fase do teste de software em que módulos são combinados e testados em grupo. Ela sucede o teste de unidade, em que os módulos são testados individualmente, e antecede o teste de sistema, em que o sistema completo (integrado) é testado num ambiente que simula o ambiente de produção.
O teste de integração é alimentado pelos módulos previamente testados individualmente pelo teste de unidade, agrupando-os assim em componentes, como estipulado no plano de teste, e resulta num sistema integrado e preparado para o teste de sistema.
O propósito do teste de integração é verificar os requisitos funcionais, de desempenho e de confiabilidade na modelagem do sistema. Com ele é possível descobrir erros de interface entre os componentes do sistema.

**Quais falhas o teste de integração consegue identificar?**

O teste de integração é uma etapa essencial para garantir a qualidade do software. Ao identificar e corrigir falhas de interface, o teste de integração ajuda a garantir que o sistema funcione corretamente e de forma confiável.

**1. Dados perdidos ou corrompidos**

Erros de dados ocorrem quando os dados são corrompidos ou perdidos durante a transferência entre módulos. Isso pode acontecer por vários motivos, como:

* Problemas de comunicação: Os dados podem ser corrompidos durante a transmissão.
* Erros de programação: Os módulos podem não estar usando os dados corretamente.
* Problemas de hardware: Os dispositivos de armazenamento de dados podem estar danificados.

**2. Erros de sintaxe ou semântica nos dados**

São erros que ocorrem quando os dados não estão no formato esperado pelo módulo receptor. Esses erros podem ser causados por vários motivos, como:

* Erros de digitação: O módulo transmissor pode digitar os dados incorretamente.
* Erros de programação: O módulo transmissor pode não estar usando o formato de dados correto.
* Problemas de comunicação: Os dados podem ser corrompidos durante a transmissão.

**3. Diferenças nos resultados esperados**

São diferenças entre os resultados reais e os resultados esperados de um teste de integração. Essas diferenças podem ser causadas por vários motivos, como:

* Erros de programação: Um módulo pode estar calculando os resultados incorretamente.
* Erros de dados: Os dados que estão sendo usados ​​no teste podem estar incorretos.
* Problemas de comunicação: Os dados podem ser corrompidos durante a transmissão.

**4. Comportamento inesperado dos módulos em combinação**

Comportamento inesperado ocorre quando os módulos exibem um comportamento diferente do esperado. Isso pode acontecer por vários motivos, como:

* Erros de programação: Os módulos podem conter bugs ou podem não estar funcionando conforme especificado.
* Problemas de hardware: Os dispositivos de hardware podem estar danificados.
* Interferência de outros aplicativos: Outros aplicativos podem estar interferindo no funcionamento dos módulos.

## DDD (Domain Driven Design)

Software é um instrumento criado para ajudar a lidar com as complexidades da vida moderna. Software é apenas um meio par aum fim, e normalmente isso é algo muito prático e real.

Software tem que ser prático e útil; caso contrário, não iria investir tanto tempo e recursos para sua criação. Um pacote útil de software não pode ser dissociado do que espera da realidade, o domínio é suposto para nos ajudar a gerir.

Design de software é uma arte, e como qualquer arte, não pode ser ensinada e aprendida como uma ciência exata por meio de teoremas e fórmulas.

A fim de criar um bom software, é necessário saber a causa da software. Em outras palavras, é preciso entender o domínio da causa.

**Domínio**

Quando é iniciado um projeto de software, é preciso ter uma concentração maior no domínio que está operando dentro. Todo propósito de um software é aumentar um domínio específico.

Tornando um software um reflexo do domínio facilita em deixar a relação entre os dois mais harmoniosa. O software precisa incorporar os conceitos e elementos do domínio do núcleo, e precisamente perceber as relações entre eles. Software tem que modelar o domínio.

Software que não tem suas raízes plantadas profundamente no domínio não reagem bem ás mudanças ao longo do tempo.

O domínio de um sistema consiste da área e problema de negócio que ele pretende resolver.

DDD defende que os desenvolvedores devem ter um profundo conhecimento do domínio do sistema que eles desenvolvem. Esse conhecimento deve ser obtido por meio de conversas e discussões frequentes com especialistas no domínio (ou no negócio). Portanto, o design do sistema deve ser norteado para atender ao seu domínio.

É importante mencionar que DDD se sobressai quando é usado em sistemas para domínios complexos, cujas regras de negócio são mais difíceis de serem imediatamente entendidas e implementadas pelos desenvolvedores.

**Modelo**

O modelo é a representação do domínio de destino, ele é muito necessário em todo o processo de desenvolvimento de design.

Existem diferentes abordagens para design de software, um deles é o método de projeto cachoeira. Este método envolve uma série de etapas. Os especialistas em negócios colocam um conjunto de requisitos que são comunicados aos analistas de negócios. Os Analistas criam um modelo com base nesses requisitos, assim passando os resultados para os desenvolvedores.

**Linguagem Ubíqua**

Linguagem Ubíqua (ou Linguagem Onipresente) é um conceito central de DDD. Ela consiste de um conjunto de termos que devem ser plenamente entendidos tanto por especialistas no domínio (usuários do sistema) como por desenvolvedores (implementadores do sistema).

Para um projeto de software dar certo, DDD defende que esses dois papéis – especialistas no domínio e desenvolvedores – devem falar a mesma língua, que vai constituir a chamada Linguagem Ubíqua do sistema. Essa ideia é ilustrada na seguinte figura:

![Linguagem Ubíqua](./github/linguagem-ubiqua.png)

**Objetos de Domínio**

DDD foi proposto pensando em sistemas implementados em linguagens orientadas a objetos. Então, quando se define o design desses sistemas, alguns tipos importantes de objetos se destacam. Dentre eles, DDD lista os seguintes:

* Entidades
* Objetos de Valor
* Serviços
* Agregados
* Repositórios

Esses tipos de objetos de domínio devem ser entendidos como as ferramentas conceituais que um projetista deve lançar mão para projetar com sucesso um determinado sistema. Por isso, eles são chamados também dos building blocks de DDD.

* **Entidades e Objetos de Valor:**

Uma entidade é um objeto que possui uma identidade única, que o distingue dos demais objetos da mesma classe. Por exemplo, cada Usuário da nossa biblioteca é uma entidade, cujo identificador é o seu número de matrícula na universidade.

Por outro lado, objetos de valor (value objects) não possuem um identificador único. Assim, eles são caracterizados apenas por seu estado, isto é, pelos valores de seus atributos. Por exemplo, o Endereço de um Usuário da biblioteca é um objeto de valor. Veja que se dois Endereços tiverem exatamente os mesmos valores para rua, número, cidade, CEP, etc, eles serão idênticos.

Outros exemplos de objetos de valor incluem: Moeda, Data, Fone, Email, Hora, Cor, etc.

*Por que distinguir entre entidades e objetos de valor?* Entidades são objetos mais importantes e devemos, por exemplo, projetar com cuidado como eles serão persistidos e depois recuperados de um banco de dados. Devemos também tomar cuidado com o ciclo de vida de entidades. Por exemplo, podem existir regras que governam a criação e remoção de entidades. No caso da nossa biblioteca, não se pode remover um Usuário se ele tiver um Empréstimo pendente.

Já objetos de valor são mais simples. E também eles devem ser imutáveis, ou seja, uma vez criados, não deve ser possível alterar seus valores internos. Por exemplo, para alterar o Endereço de um Usuário devemos abandonar o objeto antigo e criar um objeto com o Endereço novo.

**Serviços**


## Referências

- [Udemy](https://www.udemy.com/course/nodejs-avancado-com-clean-architecture-nestjs-typescript/)
- [Eng Softmoderna](https://engsoftmoderna.info/artigos/ddd.html)
- [Clean Architecture](https://medium.com/luizalabs/descomplicando-a-clean-architecture-cf4dfc4a1ac6)
- [Chat GPT](https://chat.openai.com/)
