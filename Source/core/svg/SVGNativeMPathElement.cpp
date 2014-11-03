/*
 * Copyright (C) 2007 Eric Seidel <eric@webkit.org>
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Library General Public
 * License as published by the Free Software Foundation; either
 * version 2 of the License, or (at your option) any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Library General Public License for more details.
 *
 * You should have received a copy of the GNU Library General Public License
 * along with this library; see the file COPYING.LIB.  If not, write to
 * the Free Software Foundation, Inc., 51 Franklin Street, Fifth Floor,
 * Boston, MA 02110-1301, USA.
 */

#include "config.h"

#include "core/svg/SVGNativeMPathElement.h"

#include "core/XLinkNames.h"
#include "core/dom/Document.h"
#include "core/svg/SVGNativeAnimateMotionElement.h"
#include "core/svg/SVGDocumentExtensions.h"
#include "core/svg/SVGPathElement.h"

namespace blink {

inline SVGNativeMPathElement::SVGNativeMPathElement(Document& document)
    : SVGElement(SVGNames::nativeMPathTag, document)
    , SVGURIReference(this)
{
}

DEFINE_NODE_FACTORY(SVGNativeMPathElement)

SVGNativeMPathElement::~SVGNativeMPathElement()
{
#if !ENABLE(OILPAN)
    clearResourceReferences();
#endif
}

void SVGNativeMPathElement::buildPendingResource()
{
    clearResourceReferences();
    if (!inDocument())
        return;

    AtomicString id;
    Element* target = SVGURIReference::targetElementFromIRIString(hrefString(), treeScope(), &id);
    if (!target) {
        // Do not register as pending if we are already pending this resource.
        if (document().accessSVGExtensions().isElementPendingResource(this, id))
            return;

        if (!id.isEmpty()) {
            document().accessSVGExtensions().addPendingResource(id, this);
            ASSERT(hasPendingResources());
        }
    } else if (isSVGPathElement(target)) {
        // Register us with the target in the dependencies map. Any change of hrefElement
        // that leads to relayout/repainting now informs us, so we can react to it.
        addReferenceTo(toSVGElement(target));
    }

    targetPathChanged();
}

void SVGNativeMPathElement::clearResourceReferences()
{
    removeAllOutgoingReferences();
}

Node::InsertionNotificationRequest SVGNativeMPathElement::insertedInto(ContainerNode* rootParent)
{
    SVGElement::insertedInto(rootParent);
    if (rootParent->inDocument())
        buildPendingResource();
    return InsertionDone;
}

void SVGNativeMPathElement::removedFrom(ContainerNode* rootParent)
{
    SVGElement::removedFrom(rootParent);
    notifyParentOfPathChange(rootParent);
    if (rootParent->inDocument())
        clearResourceReferences();
}

void SVGNativeMPathElement::parseAttribute(const QualifiedName& name, const AtomicString& value)
{
    parseAttributeNew(name, value);
}

void SVGNativeMPathElement::svgAttributeChanged(const QualifiedName& attrName)
{
    if (SVGURIReference::isKnownAttribute(attrName)) {
        SVGElement::InvalidationGuard invalidationGuard(this);
        buildPendingResource();
        return;
    }

    SVGElement::svgAttributeChanged(attrName);
}

SVGPathElement* SVGNativeMPathElement::pathElement()
{
    Element* target = targetElementFromIRIString(hrefString(), treeScope());
    return isSVGPathElement(target) ? toSVGPathElement(target) : 0;
}

void SVGNativeMPathElement::targetPathChanged()
{
    notifyParentOfPathChange(parentNode());
}

void SVGNativeMPathElement::notifyParentOfPathChange(ContainerNode* parent)
{
    if (isSVGNativeAnimateMotionElement(parent))
        toSVGNativeAnimateMotionElement(parent)->updateAnimationPath();
}

} // namespace blink
